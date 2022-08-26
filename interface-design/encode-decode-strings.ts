class EncodeDecode {
  encode (list: string[]): string {
    let str = ''

    for (let i = 0; i < list.length; i++) {
      let len = list[i].length
      str += len.toString() + '#' + list[i] 
    }

    return str
  }

  decode (str: string): string[] {
    let result = []

    let i = 0

    while (i < str.length) {
      if (str[i] === '#') {
        let len = +str[i - 1]
        result.push(str.substring(i + 1, i + 1 + len))
        i = i + 1 + len
      } else {
        i++
      }
    }

    return result
  }
}

let input = ["lint","code","love","you"]

const encodeDecode = new EncodeDecode()
let encoded = encodeDecode.encode(input)
console.log(encodeDecode.decode(encoded))