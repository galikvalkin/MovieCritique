
import { observable, action } from 'mobx';
import icons from '../config/icons';

class LoaderStore {
  @observable lastIcon = icons.camera;
  @observable lastColors = 'camera';
	@observable show = false;

  @action switchLast(icon: string, lastColors: Array<string>) {
    this.lastIcon = icon;
    this.lastColors = lastColors;
  }

  @action switch(value) {
    this.show = value;
  }

  @action clearStore() {
    this.show = false;
  }
}

const loaderStore = new LoaderStore();

export default loaderStore;


