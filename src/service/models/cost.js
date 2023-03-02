import LAxios from '@/service/request/index'

export function get_list(book_id, date, page, page_size = 5) {
    return LAxios.get({
        url: `/bill/list?book_id=${book_id}&date=${date}&page_size=${page_size}&page=${page}`,
    })
} 