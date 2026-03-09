import { makeAutoObservable, runInAction } from "mobx";
import RequestsService from "../API/RequestsService";

class AdminRequestsStore {
  requests = [];
  status = "idle";
  errors = [];
  totalPages = null;
  currentPage = 1;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  async initFirstPage(limit = 8) {
    this.status = "loading";
    try {
      const response = await RequestsService.fetchPendingRequests(1, limit);
      runInAction(() => {
        this.requests = response.data.requests;
        this.totalPages = response.totalPages;
        this.currentPage = 1;
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.errors = [...this.errors, ...e.response?.data?.errors];
        this.status = "failed";
      });
    }
  }

  async loadNextPage(limit = 8) {
    if (this.currentPage >= this.totalPages) return;
    this.status = "loading";
    try {
      const nextPage = this.currentPage + 1;
      const response = await RequestsService.fetchPendingRequests(
        nextPage,
        limit,
      );
      runInAction(() => {
        this.requests = [...this.requests, ...response.data.requests];
        this.totalPages = response.data.totalPages || 1;
        this.currentPage = nextPage;
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.errors = [...this.errors, ...e.response?.data?.errors];
        this.status = "failed";
      });
    }
  }

  async changeRequestStatus(id, status) {
    this.status = "loading";
    try {
      await RequestsService.changeRequestStatus(id, status);
      runInAction(() => {
        this.requests = this.requests.filter((request) => request.id !== id);
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.errors = [
          ...this.errors,
          { id, messages: e.response?.data?.errors.map((err) => err.msg) },
        ];
        this.status = "failed";
      });
    }
  }
}

export default new AdminRequestsStore();
