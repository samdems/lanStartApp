<x-input-label for="version" value="Version"/>
<x-text-input name="version" value="{{ $gameArchive->version ?? old('version') }}"></x-text-input>
<x-input-error for="version" :messages="$errors->first('version')"/>

<x-input-label for="operating_system" value="Operating System"/>
<x-text-input name="operating_system" value="{{ $gameArchive->operating_system ?? old('operating_system') }}"></x-text-input>
<x-input-error for="operating_system" :messages="$errors->first('operating_system')"/>

<x-input-label for="archive" value="archive"/>
<x-file name="archive"></x-file>
<x-input-error for="archive" :messages="$errors->first('archive')"/>

<x-input-label for="script" value="Script"/>
<x-text-code name="script" :value="$gameArchive->script ?? old('script')"></x-text-code>
<x-input-error for="script" :messages="$errors->first('script')"/>



