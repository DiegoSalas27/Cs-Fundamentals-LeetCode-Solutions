class MyMath {
  static pow (a, b) {
    if (b === 0) return 1

    let prev = b
    let temp = a
    while(Math.abs(b) > 1) {
      a *= temp;
      b = Math.abs(b) - 1
    }

    return prev > 0 ? a : 1 / a
  }

  static powOptimized (a, b) {
    if (b === 0) return 1

    let memo = {}

    const getPow = (a, b, memo) => {
      if (b === 1) return a
      
      let multiplier = 1
      if (b % 2 > 0) {
        multiplier = a
        b--
      }
  
      if (memo[b] === undefined) {
        memo[b] = getPow(a, b / 2, memo) * getPow(a, b / 2, memo) * multiplier
      } 
      
      return memo[b]
    }

    return getPow(a, b, memo)
  }
}

// console.log(MyMath.powOptimized(2, -2))
console.log(MyMath.pow(2, -2))
