import WorksService from "../API/worksFetch";
import { makeAutoObservable, runInAction } from "mobx";

class WorksImages {
  images = [];
  totalPages = 1;
  currentPage = 1;
  status = "idle";
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadNextPage(limit = 12) {
    if (this.currentPage >= this.totalPages) return;
    this.status = "loading";
    try {
      const nextPage = this.currentPage + 1;
      const response = await WorksService.getSlides(nextPage, limit);
      runInAction(() => {
        this.images = [...this.images, ...response.data.works];
        this.totalPages = response.data.totalPages || 1;
        this.currentPage = nextPage;
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.error = e.message;
        this.status = "failed";
      });
    }
  }

  async initFirstPage(limit = 12) {
    this.status = "loading";
    try {
      const response = await WorksService.getSlides(1, limit);
      runInAction(() => {
        this.images = response.data.works;
        this.totalPages = response.data.totalPages || 1;
        this.currentPage = 1;
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.error = e.message;
        this.status = "failed";
      });
    }
  }
}

export default new WorksImages();
