import { makeAutoObservable, runInAction } from "mobx";
import CardService from "../API/cardsFetch";

class Catalog {
  items = [];
  status = "idle";
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getItems() {
    if (this.items.length === 0) {
      try {
        await this.getItemsApi();
      } catch (e) {
        runInAction(() => {
          this.error = e.message;
          this.status = "failed";
        });
      }
    }
    return this.items;
  }

  async getItemsApi() {
    this.status = "loading";
    try {
      const response = await CardService.getCards();
      console.log(response);
      runInAction(() => {
        this.items = response.data.products;
        this.status = "succeeded";
      });
    } catch (e) {
      runInAction(() => {
        this.error = e.message;
        this.status = "failed";
      });
    }

    return this.items;
  }
}

export default new Catalog();
