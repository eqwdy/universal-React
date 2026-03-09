import React, { useRef } from "react";
import cl from "./UserRequests.module.css";
import { observer } from "mobx-react-lite";
import UserRequestsStore from "../../store/UserRequestsStore";
import Request from "./Request";
import Loader from "../UI/Loader/Loader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const UserRequests = observer(() => {
  const loaderRef = useRef(null);

  useInfiniteScroll(
    loaderRef,
    UserRequestsStore.status,
    () => UserRequestsStore.initFirstPage(6),
    () => UserRequestsStore.loadNextPage(6),
  );

  if (!UserRequestsStore.requests || UserRequestsStore.requests.length === 0) {
    return <h2 className={cl.empty}>Заявок нет</h2>;
  }

  return (
    <>
      <ul className={cl.requestItems}>
        {UserRequestsStore.requests.map((request) => (
          <li className={cl.requestItem} key={request.id}>
            <Request request={request} />
          </li>
        ))}
      </ul>

      <div ref={loaderRef} style={{ height: "40px" }}>
        {UserRequestsStore.status === "loading" && <Loader />}
      </div>
    </>
  );
});

export default UserRequests;
