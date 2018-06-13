
import { observable, action, computed } from 'mobx';

class MovieStore {
  @observable movies = {};

  @action setMovies(list) {
    this.movies = list;
  }

  @computed get getList () {
    let keys = Object.keys(this.movies);

    return keys.map(key => {
      return {
        ...this.movies[key],
        mid: key
      };
    });
  }

  @action getMovie(id) {
    if (id && this.movies && this.movies[id]) {
      return this.movies[id];
    }

    return null;
  }
}

const movieStore = new MovieStore();

export default movieStore;
