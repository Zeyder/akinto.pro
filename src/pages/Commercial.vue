<template>
    <div class="page-commercial">
        <PhotoGrid :items="$appContent.commercial || []"
                   route-name="CommercialItem"
        />
    </div>
</template>
<script>
import PhotoGrid from '../components/PhotoGrid'

export default {
  name: 'Commercial',
  components: { PhotoGrid }
}
</script>
