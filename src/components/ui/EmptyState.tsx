export default function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <p className="text-gray-500">{message}</p>
        </div>
    );
}
