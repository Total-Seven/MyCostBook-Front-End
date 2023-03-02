import LAxios from '../request/index'

/**
 * chart/getYear_LinePieTop
 * chart/getMonth_LinePieTop
 * chart/getWeek_LinePieTop
 * chart/getDay_LinePieTop
 * 
 * @returns 
 */
// export function exp_Data_Year() {
//     return LAxios.get({
//         url: `chart/getYear_LinePieTop`,
//     })
// } export function exp_Data_Month() {
//     return LAxios.get({
//         url: `chart/getMonth_LinePieTop`,
//     })
// } export function exp_Data_Week() {
//     return LAxios.get({
//         url: `chart/getWeek_LinePieTop`,
//     })
// } export function exp_Data_Day() {
//     return LAxios.get({
//         url: `chart/getDay_LinePieTop`,
//     })
// }
export function exp_Exp_Inc_Trf() {
    return LAxios.get({
        url: `chart/get_Exp_Inc_Trf`,
    })
}