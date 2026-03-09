import { makeAutoObservable, runInAction } from "mobx";
import RequestsService from "../API/RequestsService";

class UserRequestsStore {
  requests = [];
  totalPages = 1;
  currentPage = 1;
  status = "idle";
  error = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  async initFirstPage(limit = 8) {
    this.status = "loading";
    try {
      const response = await RequestsService.fetchUserRequests(1, limit);
      runInAction(() => {
        this.requests = response.data.requests;
        this.totalPages = response.totalPages;
        this.currentPage = 1;
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.error = e.response?.data?.errors;
        this.status = "failed";
      });
    }
  }

  async loadNextPage(limit = 8) {
    if (this.currentPage >= this.totalPages) return;
    this.status = "loading";
    try {
      const nextPage = this.currentPage + 1;
      const response = await RequestsService.fetchUserRequests(nextPage, limit);
      runInAction(() => {
        this.requests = [...this.requests, ...response.data.requests];
        this.totalPages = response.data.totalPages || 1;
        this.currentPage = nextPage;
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.error = e.response?.data?.errors;
        this.status = "failed";
      });
    }
  }

  async addRequest(formData) {
    this.status = "loading";
    try {
      await RequestsService.addRequest(formData);
      await this.getRequestsApi();
    } catch (e) {
      runInAction(() => {
        this.error = e.response?.data?.errors;
        this.status = "failed";
      });
    }
  }

  async deleteRequest(id) {
    this.status = "loading";
    if (
      this.requests.find((request) => request.id === id).status !== "pending"
    ) {
      runInAction(() => {
        this.error = [
          { msg: "You can't delete checked requests", side: "front" },
        ];
        this.status = "failed";
      });
      return;
    }
    try {
      await RequestsService.deleteRequest(id);
      runInAction(() => {
        this.requests = this.requests.filter((request) => request.id !== id);
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.error = e.response?.data?.errors;
        this.status = "failed";
      });
    }
  }
}

export default new UserRequestsStore();
