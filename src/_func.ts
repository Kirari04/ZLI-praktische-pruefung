import _data from "./_data"

export default function loadWorkList(path: string, isJson: boolean = true): Promise<LoadWorkItems> {
 return new Promise((resolve, reject) => {
    fetch(new URL(`${_data.API}${path}`))
    .then(e => isJson?e.json():e.text())
    .then(data => {
        resolve({
            success: true,
            data: data,
            error: null
        })
    })
    .catch(err => {
        resolve({
            success: false,
            data: [],
            error: err.message
        })
    })
 })
}