const inp = document.querySelector("#inp");
const out = document.querySelector("#out");
const jsonBtn = document.querySelector("#to-json");
const csvBtn = document.querySelector("#to-csv");
const uploadBtn = document.querySelector("#upload-file");
const clearBtn = document.querySelector("#clear-btn");
const saveBtn = document.querySelector("#save-btn");

jsonBtn.addEventListener("click", () => {
    out.value = csv2json(inp.value);
});

csvBtn.addEventListener("click", () => {
    out.value = json2csv(inp.value);
});

uploadBtn.addEventListener("change", event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (e) => {
        inp.value = reader.result;
    }
    reader.readAsText(file);
});

clearBtn.addEventListener("click", () => {
    out.value = '';
});

saveBtn.addEventListener("click", () => download('covert-file.txt', out.value));

function csv2json(csv_data) {
    let lines = csv_data.split("\n");
    let keys = lines[0].split(",");
    let result = [];
    lines.shift();
    lines.forEach((line) => {
        let values = line.split(",");
        let tmp = {};
        keys.forEach((key, i) => {
            tmp[key] = values[i];
        });

        result.push(tmp);
    });

    return JSON.stringify(result);
}

function json2csv(json_data) {
    const data = JSON.parse('[' + json_data + ']');
    const header = Object.keys(data[0]);
    const rows = data.map(row => header.map(key => row[key]));
    const result = [
        header,
        ...rows.map(el => el.join(','))
    ].join('\n');

    return result;
}

function download(filename, content) {
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    link.setAttribute('download', filename);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}