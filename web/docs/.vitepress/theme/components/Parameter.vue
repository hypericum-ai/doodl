<template>
  <div>
    <dt>
      <strong>{{ name }}</strong>
      <span v-if="type">
        <code>{{ type }}</code>
      </span>
    </dt>
    <dd><slot/></dd>
  </div>
</template>

<!--
// The usage of this component is to document parameters. The properties
// are straightforward: `name` is the name of the parameter, and
// `type` is an optional string describing the type of the parameter.
// The content of the component is a description of the parameter.
// Specifying the content is quirky. The node must have a single child
// element, which may be in Markdown. In order to have multiple elements
// (paragraphs, lists, etc) you must wrap them in a div. For example:
//
// <Parameter name="data" type="DataFrame | Series | list[dict]">
//   <div>
//
// This is a description of the data parameter. It may include
// multiple paragraphs, lists, etc, but they must be wrapped in a div.
//
// This can be *any* valid Markdown.
//
//   </div>
// </Parameter>
//
//  The blank lines after the opening and before the closing div are *required*.
//  This is a limitation of Vue's handling of slots.
-->

<script setup>
defineProps({
  name: { type: String, required: true },
  type: { type: String, default: '' }
})
</script>

<style scoped>
dt {
  font-weight: 600;
  margin-top: 0.8em;
  margin-bottom: 0.2em;
}
dt code {
  font-weight: 400;
  background: #f6f8fa;
  padding: 0.1em 0.3em;
  border-radius: 4px;
  font-size: 0.9em;
  margin-left: 0.3em;
}
dd {
  margin: 0 0 0.8em 1.25em;
  line-height: 1.5;
}
</style>
