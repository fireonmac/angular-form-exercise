/**
 * 인풋 등에서 값이 null이 나오는 경우를 막고자 빈 스트링을 넣어줍니다.
 * @param param<string | null | undefined>
 * @returns ''
 */
export function preventNullWithEmptyString(param: string | null | undefined) {
  if (!param) {
    return '';
  }

  return param;
}
