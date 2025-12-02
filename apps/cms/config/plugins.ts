export default () => ({
  // Editor WYSIWYG basato su React MD Editor per i campi rich text
  "wysiwyg-react-md-editor": {
    enabled: true,
    config: {
      // Toolbar di base, puoi personalizzarla da qui secondo le tue esigenze:
      // ["title2", "title3", "bold", "italic", "quote", "unorderedListCommand", "orderedListCommand", "strapiMediaLibrary"]
      // Se la lasci vuota, il plugin userà la toolbar di default.
      // vedi: https://market.strapi.io/plugins/strapi-plugin-wysiwyg-react-md-editor
      // toolbarCommands: ["title2", "title3", "bold", "italic", "quote", "unorderedListCommand", "orderedListCommand", "strapiMediaLibrary"],
    },
  },
});

