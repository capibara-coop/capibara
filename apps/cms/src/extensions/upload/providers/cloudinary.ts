import cloudinary from 'cloudinary';
import type { Provider } from '@strapi/plugin-upload';

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export default {
  init(config: CloudinaryConfig): Provider {
    cloudinary.v2.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });

    return {
      upload(file: any) {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
              folder: 'strapi',
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              if (!result) {
                return reject(new Error('Upload failed'));
              }
              resolve({
                ...file,
                url: result.secure_url,
                provider_metadata: {
                  public_id: result.public_id,
                  resource_type: result.resource_type,
                },
              });
            }
          );

          file.stream.pipe(uploadStream);
        });
      },
      async delete(file: any) {
        try {
          const { public_id } = file.provider_metadata || {};
          if (public_id) {
            await cloudinary.v2.uploader.destroy(public_id);
          }
        } catch (error) {
          // Log error but don't throw - file might already be deleted
          console.error('Error deleting file from Cloudinary:', error);
        }
      },
    };
  },
};

