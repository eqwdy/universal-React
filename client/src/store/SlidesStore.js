import SlidesService from "../API/slidesFetch";
import { makeAutoObservable, runInAction } from "mobx";

class SlidesStore {
  slides = [];
  status = "idle";
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getSlides() {
    if (this.slides.length === 0) {
      this.status = "loading";
      try {
        const response = await SlidesService.getSlides();
        runInAction(() => {
          this.slides = response?.data?.slides;
          this.status = "succeeded";
        });
      } catch (e) {
        runInAction(() => {
          this.error = e.response?.error;
          this.status = "failed";
        });
      }
    }
    return this.slides;
  }
}

export default new SlidesStore();
