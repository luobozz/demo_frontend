export default {
    object: {
        Merger: (object, supplement) => {
            for (let i in supplement) {
                object[i] = supplement[i];
            }
        },
    },
}