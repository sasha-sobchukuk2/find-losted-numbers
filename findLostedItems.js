const arr = [1, 3, 4, 5, 6, 8, 9, 10, 11]

const realFirstEl = 1
const realLastEl = 11
const idealLength = 11
const losted = new Set()


function findLost(arr, firstEl, lastEl, idealLength, losted) {

    if (arr.length < 3) {
        const firstEl = arr[0]
        const lastEl = arr[arr.length - 1]
        const idealProgression = buildArithmeticProgression(firstEl, lastEl)
        const newLosted = findMissing(idealProgression, arr)

        if (newLosted?.length) {
            newLosted.forEach(i => losted.add(i))
        }

        return losted
    }

    const realMiddleItem = arithmeticProgressionMedian(arr)

    const idealRightLength_withMiddle = getLengthProgression(realMiddleItem, lastEl)
    const idealLeftLength_withMidddle = getLengthProgression(firstEl, realMiddleItem)

    const realRightLength = getRealLength(arr, realMiddleItem, realLastEl)
    const realLeftLength = getRealLength(arr, realFirstEl, realMiddleItem)


    if (idealRightLength_withMiddle - 1 > realRightLength) {
        const realMiddleItemIndex = arr.indexOf(realMiddleItem)
        const realLastEl = arr[arr.length - 1]
        const newIdealLength = getLengthProgression(realMiddleItem, realLastEl)
        const newArr = arr.slice(realMiddleItemIndex, arr.length)
        const newLosted = findLost(newArr, realMiddleItem, realLastEl, newIdealLength, losted)
        if (newLosted?.size) {
            losted.add(...newLosted)
        }
    }

    if (idealLeftLength_withMidddle - 1 > realLeftLength) {
        const realMiddleItemIndex = arr.indexOf(realMiddleItem)
        const realLastEl = arr[realRightLength]
        const realFirstEl = arr[0]
        const newIdealLength = getLengthProgression(realFirstEl, realLastEl)
        const newArr = arr.slice(0, realMiddleItemIndex + 1)

        const newLosted = findLost(newArr, realFirstEl, realMiddleItem, newIdealLength, losted)
        if (newLosted?.size) {
            losted.add(...newLosted)
        }
    }

    return losted
}

const myLosted = findLost(arr, realFirstEl, realLastEl, idealLength, losted)
console.log('myLostedElements: ', myLosted)

function getRealLength(arr, beginIndex, endIndex) {
    return arr.slice(arr.indexOf(beginIndex), arr.indexOf(endIndex)).length
}

function arithmeticProgressionMedian(arr) {
    const length = arr.length;
    const midIndex = Math.floor(length / 2);
    return arr[midIndex]
}

function getLengthProgression(firstElement, lastElement, step = 1) {
    return Math.ceil((lastElement - firstElement) / step) + 1;
}

function buildArithmeticProgression(firstEl, lastEl, step = 1) {
    const arr = [firstEl]
    let iteration = firstEl
    while (!arr.includes(lastEl)) {
        arr.push(iteration + step)
        iteration++
    }
    return arr
}

function findMissing(arrIdeal, arrReal) {
    return arrIdeal.filter((el) => !arrReal.includes(el))
}














