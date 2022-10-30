import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

const font = fetch(
  new URL('../../public/Inter-Bold.otf', import.meta.url)
).then(async (res) => res.arrayBuffer());

const handler = async (): Promise<ImageResponse> => {
  const fontData = await font;

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center justify-center w-full h-full bg-zinc-50 text-5xl bg-zinc-50 font-bold">
        Compass
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
};

export default handler;
