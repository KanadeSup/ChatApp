import { useLinkPreview } from "get-link-preview";
import { Skeleton } from "@/components/ui/skeleton"
import getLinkPreview from "../api/getLinkPreview";
import { useState, useEffect } from "react";

export default function ViewLinkPreview({ url, className }) {
  const [dataPreview, setDataPreview] = useState(null);
  const { getLinkPreviewData, loading, error, data } = useLinkPreview(url);
  useEffect(() => {
    setDataPreview(data);
    const getData = async () => {
      console.log("da chayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
      if (data?.message || !data?.description || data?.description === "") {
        const response = await getLinkPreview(url);
        console.log("chay cai ton tien")
        if (!response.error) {
          setDataPreview(response);
        }
      } else {
        setDataPreview(data);
      }
    };
    if (data) {
      getData();
    }
  }, [url, data]);

  if (loading) return <p></p>;
  if (error) return <p>Error</p>;
  if (data?.message) return <></>;

  return (
    <div className={className} onClick={() => window.open(url, "_blank")}>
      <div className="flex flex-row gap-3 cursor-pointer bg-slate-50">
        {dataPreview?.image ? (
          <img
            className="max-w-[120px] mt-1 rounded-sm h-20"
            src={dataPreview?.image}
          />
        ) : (
          <Skeleton className="w-[120px] mt-1 rounded-sm h-20 bg-gray-200" />
        )}
        <div className="flex flex-col justify-between">
          <p className="font-semibold font-sans text-sm">{dataPreview?.title}</p>
          <p className="text-gray-500 font-sans text-sm">{dataPreview?.description}</p>
          <p className="text-bold-blue font-semibold font-sans text-sm">
            {dataPreview?.domain}
          </p>
        </div>
      </div>
    </div>
  );
}
