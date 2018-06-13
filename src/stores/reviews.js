
import { observable, action, computed } from 'mobx';

class ReviewStore {
  @observable reviews = new Map();

  @action setMovieReviews(mid, reviews) {
    this.reviews.set(mid, reviews);
  }

  getMovieReviews(mid) {
    return computed(() => {
      return this.reviews.get(mid) || {};
    }).get();
  }

  getUserReviews(uid) {
    return computed(() => {
      let uReviews = [];
      let keys = Array.from(this.reviews.keys());
      keys.map(key => {
        let mReviews = this.reviews.get(key);
        if (mReviews) {
          for (let i in mReviews) {
            if (mReviews[i].author_id === uid) {
              uReviews.push({
                ...mReviews[i],
                mid: key,
                reviewId: i
              });
            }
          }
        }
      });

      return uReviews;
    }).get();
  }

  @computed get getList () {
    let keys = Array.from(this.reviews.keys());

    return keys.map(key => {
      return this.reviews.get(key);
    });
  }
}

const reviewStore = new ReviewStore();

export default reviewStore;
