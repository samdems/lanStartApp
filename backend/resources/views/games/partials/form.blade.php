<x-input-label for="title" value="Title" />
<x-text-input name="title"></x-text-input>
<x-input-error for="title" :messages="$errors->first('title')"/>

<x-input-label for="description" value="Description"/>
<x-text-input name="description"></x-text-input>
<x-input-error for="description" :messages="$errors->first('description')"/>

<x-input-label for="archive" value="Archive"/>
<x-file name="archive"></x-file>
<x-input-error for="archive" :messages="$errors->first('archive')"/>

<x-input-label for="cover_image" value="Cover Image"/>
<x-file name="cover_image"></x-file>
<x-input-error for="cover_image" :messages="$errors->first('cover_image')"/>

<x-input-label for="box_image" value="Box Image"/>
<x-file name="box_image"></x-file>
<x-input-error for="box_image" :messages="$errors->first('box_image')"/>

<x-input-label for="icon_image" value="Icon Image"/>
<x-file name="icon_image"></x-file>
<x-input-error for="icon_image" :messages="$errors->first('icon_image')"/>

<x-input-label for="logo_image" value="Logo Image"/>
<x-file name="logo_image"></x-file>
<x-input-error for="logo_image" :messages="$errors->first('logo_image')"/>

