@props(['id' => 'code', 'value' => ''])

<textarea id="{{$id}}"  >
{{ $value }}
</textarea>

<textarea id="{{$id . '-input'}}"  {{ $attributes }} rows="20" hidden>
{{ $value }}
</textarea>

<script>
    setTimeout(() => {
        var editor = CodeMirror.fromTextArea(document.getElementById("{{$id}}"), {
            mode: "javascript",
            theme: "dracula",
            lineNumbers: true
        });
        editor.on('change', function() {
            document.getElementById("{{$id . '-input'}}").value = editor.getValue();
        });
    }, 100);
</script>
