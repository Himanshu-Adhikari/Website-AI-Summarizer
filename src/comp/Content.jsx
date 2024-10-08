import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
const Content = () => {
  const [article,setArticle]=useState({url:"",summary:""});
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [alldata,setalldata]=useState([]);

  useEffect(()=>{
    const article_from_local_storage=JSON.parse(localStorage.getItem('articles'));
    if(article_from_local_storage)setalldata(article_from_local_storage);
  },[]);
  const [copydata,setcopydata]=useState("");

  const handleSubmit=async (e)=>{
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      // update state and local storage
      const updated_data=[newArticle,...alldata];
      setalldata(updated_data);
      setArticle(newArticle);
      localStorage.setItem('articles',JSON.stringify(updated_data));
    }
  };
  const handlecopy=(e)=>{
    setcopydata(e);
    navigator.clipboard.writeText(e);
    setTimeout(() => {
      setcopydata(false),3000
    }, timeout);
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* {Search} */}
      <div className="mt-16 w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter url for summarization .. "
            value={article.url}
            required
            onChange={(e) => {setArticle({...article,url:e.target.value})}}
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-950"
          >
            ↵
          </button>
        </form>
        {/* {URL history} */}
        <div className="flex flex-col gap-1 max-h60 overflow-y-auto">
          {alldata.map((item,index)=>(
            <div key={`link-${index}`}onClick={()=>setArticle(item)}className="link_card">
              <div className="copy_btn" onClick={()=>handlecopy(item.url)}><img src={copydata === item.url?tick:copy} alt="copy" className="w-[40%] h-[40%] object-contain" /></div>
              <p className="flex-1 font-satoshi text-blue-800 font-medium text-sm truncate">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* {display resulfts} */}
      <div className="my-10 max-w-full flex justify-center items-center">
      {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Content;
