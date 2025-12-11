export default function VideoPlayer({ videoUrl }) {
  if (!videoUrl) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200">
        <p className="text-gray-600">No video available for this lesson.</p>
      </div>
    );
  }

  const isYouTube = videoUrl.includes("youtube") || videoUrl.includes("youtu.be");

  return (
    <div className="overflow-hidden rounded-lg bg-black">
      {isYouTube ? (
        <iframe
          src={videoUrl}
          title="Lesson Video"
          className="h-64 w-full md:h-96"
          allowFullScreen
        />
      ) : (
        <video controls className="h-64 w-full md:h-96">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}
    </div>
  );
}
