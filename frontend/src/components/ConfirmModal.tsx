type ConfirmModalProps = {
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  confirmText?: string;
  loadingText?: string;
};

function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmText = "Delete",
  loadingText = "Deleting...",
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-auplant-dark">{title}</h2>

        <p className="mt-3 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
