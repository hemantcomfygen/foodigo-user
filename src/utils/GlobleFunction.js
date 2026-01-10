import toast from "react-hot-toast";

const keyData = "DWM";

export const sessionStorageSetItem = (item) => {
  return sessionStorage.setItem(keyData, JSON.stringify(item));
};

export const sessionStorageGetItem = () => {
  const data = window.sessionStorage.getItem(keyData);
  return data ? JSON.parse(data) : null;
};

export const sessionStorageRemoveItem = () => {
  sessionStorage.removeItem(keyData);
};

export const localStorageSetItem = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const localStorageGetItem = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const localStorageRemoveItem = (key) => {
  localStorage.removeItem(key);
};

export const saveWalletToLocalStorage = (wallet) => {
  const cleanMnemonic = wallet.mnemonic?.trim().replace(/^"|"$/g, "") || wallet.passPhrase?.trim().replace(/^"|"$/g, "");

  const existingWallets = localStorageGetItem("wallets") || [];

  const newWallet = {
    mnemonic: cleanMnemonic,
    password: wallet.password,
    wallet_name: wallet.wallet_name,
    _id: wallet._id,
    createdAt: new Date().toISOString(),
  };

  const updatedWallets = [...existingWallets, newWallet];

  localStorageSetItem("wallets", updatedWallets);
  localStorageSetItem("active_wallet", newWallet);

  return newWallet;
};



export const formatNumber = (value) => {
  if (!value && value !== 0) return "";
  return Number(value).toLocaleString("en-US");
};

export const shortenAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// export const copyToClipboard = (text, message = "Copied") => {

//   navigator.clipboard.writeText(text);
//   toast.success(message);
// };

export const copyToClipboard = async (text, message = "Copied") => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // ✅ Preferred method (works on most modern browsers)
      await navigator.clipboard.writeText(text);
    } else {
      // ⚙️ Fallback for older browsers and some mobile devices
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    toast.success(message);
  } catch (error) {
    console.error("Copy failed:", error);
    toast.error("Failed to copy");
  }
};


export const formatDateTime = (isoString) => {
  if (!isoString) return '';

  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getMarketChangeColor = (value) => {
  if (value > 0) return "text-success";
  if (value < 0) return "text-danger";
  return "text-gray-500";
};




export const safeNumber = (value) => {
  const num = Number(value);
  if (isNaN(num) || value === null || value === undefined) {
    return 0;
  }
  return num;
};


export function formatToSixDecimals(value) {
  const num = Number(value);

  if (!num) return "0";
  
  return num.toFixed(8);
}

export function calculateCoinValue(coinAmount, coinPrice) {
  const amount = Number(coinAmount);
  const price = Number(coinPrice);

  if (!amount || !price) return "0"; 

  const total = amount * price;
  return total.toFixed(2);
}