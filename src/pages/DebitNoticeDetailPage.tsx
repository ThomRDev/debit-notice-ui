import { useParams } from "react-router";
import DebtNoticeSkeleton from "../components/DebtNoticeSkeleton";
import { EditDetailDebit } from "../components/EditDetailDebit";
import { ViewDetailDebit } from "../components/ViewDetailDebit";
import { useDebitNoticeDetail } from "../hooks/useDebitNoticeDetail";
import { useUI } from "../store/useUi.store";

export const DebitNoticeDetailPage = () => {
  const { nAviso } = useParams();
  const { data, isLoading } = useDebitNoticeDetail({ nAviso: nAviso! });
  const { isShowEditDebitNotice } = useUI();

  if (isLoading) return <DebtNoticeSkeleton />;
  return (
    <div className="container mx-auto px-4">
      {isShowEditDebitNotice ? (
        <EditDetailDebit data={data} />
      ) : (
        <ViewDetailDebit data={data} />
      )}
    </div>
  );
};
