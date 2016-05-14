export default function(method, url, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;

        if (xhr.status !== 200) {
            console.log(xhr);
            return;
        }

        callback(xhr.responseText);
    };
}