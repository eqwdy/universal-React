import React, { useRef } from "react";
import cl from "../../UserRequests/UserRequests.module.css";
import AdminRequestsStore from "../../../store/AdminRequestsStore";
import { observer } from "mobx-react-lite";
import Loader from "../../UI/Loader/Loader";
import AdminRequest from "./AdminRequest";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

const AdminRequests = observer(() => {
  const loaderRef = useRef(null);

  useInfiniteScroll(
    loaderRef,
    AdminRequestsStore.status,
    () => AdminRequestsStore.initFirstPage(6),
    () => AdminRequestsStore.loadNextPage(6),
  );

  if (
    !AdminRequestsStore.requests ||
    AdminRequestsStore.requests.length === 0
  ) {
    return <h2 className={cl.empty}>Заявок нет</h2>;
  }

  return (
    <>
      <ul className={cl.requestItems}>
        {AdminRequestsStore.requests.map((request) => (
          <li className={cl.requestItem} key={request.id}>
            <AdminRequest request={request} />
          </li>
        ))}
      </ul>

      <div ref={loaderRef} style={{ height: "40px" }}>
        {AdminRequestsStore.status === "loading" && <Loader />}
      </div>
    </>
  );
});

export default AdminRequests;
