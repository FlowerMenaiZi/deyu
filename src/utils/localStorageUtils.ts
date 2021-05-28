import {SELM} from "@/types/SELM"
import {DataItem} from "@/types/AISDI"
//保存数据到浏览器的缓存中
export function saveSelItem(selItem:SELM [],localName) {
  localStorage.setItem(localName,JSON.stringify(selItem))
}

//从浏览器的缓存中读取数据
export function readSelItem(localName):SELM [] {
  return JSON.parse(localStorage.getItem(localName) || '[]')
}

export function saveAISItem(dataItem:DataItem [],localName) {
  localStorage.setItem(localName,JSON.stringify(dataItem))
}

export function readAISItem(localName) {
  return JSON.parse(localStorage.getItem(localName) || '[]')
}