import { ref, reactive } from 'vue'

export default function getRefGroup() {
    let group = reactive([])

    const handle = (refs) => {
        try {
            group.push(refs)
        } catch (error) {
            console.log(error);
        }
    }
    return { group, handle }
}