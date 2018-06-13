
import { AsyncStorage } from 'react-native';
import { observable, action } from 'mobx';
import { create, persist } from 'mobx-persist';
class AuthStore {
  @observable isHydrated = false;
  @persist @observable uid = null;

  @action setUid(uid) {
    this.uid = uid;
  }

  @action setHydrated(value) {
    this.isHydrated = value;
  }
}

const hydrate = create({
  storage: AsyncStorage
});

const authStore = new AuthStore();

export default authStore;

hydrate('auth', authStore)
  .then(() => {
    authStore.setHydrated(true);
  });
