interface LoadingSpinnerProps {
  text?: string;
}

function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className='flex items-center'>
      <div className='w-6 h-6 border-b-2 border-gray-900 rounded-full animate-spin mr-2'></div>
      {text && <span>{text}</span>}
    </div>
  );
}

export default LoadingSpinner;
