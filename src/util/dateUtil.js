// 0~6까지 숫자를 한글 요일로 반환. 0은 일요일부터 시작
export function getDayKor(number) {
  const numStr = number.toString()

  switch (numStr) {
    case '0': return '일'
    case '1': return '월'
    case '2': return '화'
    case '3': return '수'
    case '4': return '목'
    case '5': return '금'
    case '6': return '토'
    default: return ''
  }
}

export function test() {
  return 'hello world'
}