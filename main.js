document.addEventListener('DOMContentLoaded', function() {
    // selectize.jsの適用
    for (let r = 1; r <= 10; ++r) {
        for (let c = 1; c <= 5; ++c) {
            $(`#S-${r}-${c}`).selectize();
        }
    }

    // input + datalistの利用
    const inputable = function(selectorId) {
        // select要素を取得して批評時にする
        const selector = document.getElementById(selectorId);
        selector.style.display = 'none';

        // datalistに設定するIDを決める
        const datalistId = `DATALIST_ID_${selectorId}`;

        // datalist要素を作成する。optionはselect要素からコピーする
        const datalist = document.createElement('datalist');
        datalist.setAttribute('id', datalistId);
        for (const option of selector.querySelectorAll('option')) {
            datalist.appendChild(option.cloneNode(true));
        }
        selector.parentElement.insertBefore(datalist, selector);

        // 有効な値の一覧を作成する
        const values = Array.prototype.map.call(selector.querySelectorAll('option'), option => option.innerText);

        // input要素を作成する。
        // datalistによるドロップダウンを常に有効にするため、valueは常に空を保ち、select要素の値をplaceholderとして表示している
        // placeholderの文字色はCSSでblackに変更している。
        // ※placeholderであるため、コピー不可
        const input = document.createElement('input');
        selector.parentElement.insertBefore(input, selector);

        input.setAttribute('list', datalistId);
        input.setAttribute('autocomplete', 'hidden');
        // 大きさを最大の文字列の長さによって決定
        input.setAttribute('size', values.reduce((pv, cv) => Math.max(pv, cv.length), 0) + 2);
        input.setAttribute('placeholder', selector.value);
        input.classList.add('input-selector');

        // 入力決定、またはフォーカスが外れた
        input.addEventListener('change', function() {
            const newValue = input.value.trim();
            if (!values.some(v => v === newValue)) {
                // 一覧にない値が入力された
                input.value = '';
                return;
            }
            // select要素に新しい値を設定し、input要素のplaceholderに新しい値を設定、valueは空にする
            selector.value = newValue;
            input.setAttribute('placeholder', input.value);
            input.value = '';
        });
    }
    for (let r = 11; r <= 20; ++r) {
        for (let c = 1; c <= 5; ++c) {
            inputable(`S-${r}-${c}`);
        }
    }
});
