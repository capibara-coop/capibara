export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
    // Se il provider npm non funziona, usa il provider personalizzato
    // Rimuovi questo blocco se @strapi/provider-upload-cloudinary funziona
    // provider: env('CLOUDINARY_NAME') ? 'cloudinary' : 'local',
  },
});

