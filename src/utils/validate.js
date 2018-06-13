/**
 * @flow
 */
import regulars from '../config/regexp.config';
import errorTexts from '../config/error.texts';
import successTexts from '../config/success.texts';

export function validateEmail (text : string): boolean {
  return regulars.email.test(text) && text.length <= 150;
}

export function validatePassword (text : string) {
  return regulars.password.test(text);
}

export function userExist (user : Object) {
  return Object.keys(user).length;
}

export function validateReviewMessage (text : string): boolean {
  return text.length > 20;
}

export function replaceSpaces (text : string) {
  return text.replace(/\s/g, '');
}

export function parseErrorResponse (response : { code: string }) {
  const { code } = response;

  return errorTexts[code] || errorTexts.default;
}

export function parseSuccessResponse (response : { code: string }) {
  const { code } = response;

  return successTexts[code] || successTexts.default;
}

export function hasWrote (reviews: Object, uid: string) {
  let keys = Object.keys(reviews);

  for (let i = 0; i < keys.length; i++) {
    if (reviews[keys[i]].author_id === uid) {
      return true;
    }
  }

  return false;
}
