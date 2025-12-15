import { defaultArgumentObject } from "./defaults";
import { Size, DataFile } from "./types";
import { placeholder } from "./placeholder";

interface Token {
  value: string;
  expiresAt: number;
}

let cachedToken: Token | null = null;

async function retrieveToken(): Promise<Token> {
  // Replace with your actual token retrieval logic
  const response = await fetch("/api/token");
  const data = await response.json();
  
  return {
    value: data.token,
    expiresAt: Date.now() + data.expiresIn * 1000
  };
}

function isTokenExpired(token: Token): boolean {
  return Date.now() >= token.expiresAt;
}

function isTokenValid(token: Token): boolean {
  return token.value !== "" && token.value.length > 0 && !isTokenExpired(token);
}

type ChartFunction = (
  div?: string,
  data?: any,
  size?: Size,
  file?: DataFile,
  colors?: string[],
  ...options: any[]
) => Promise<void>;

export async function checkToken(
  fn: ChartFunction
): Promise<ChartFunction> {
  return async (
    div: string = defaultArgumentObject.div,
    data: any = defaultArgumentObject.data,
    size: Size = defaultArgumentObject.size,
    file: DataFile | undefined = defaultArgumentObject.file,
    colors: string[] = defaultArgumentObject.colors,
    ...options: any[]
  ): Promise<void> => {
    const name = fn.name.replace("_impl", "");
    // Check if token needs to be retrieved
    if (!cachedToken || isTokenExpired(cachedToken)) {
      try {
        cachedToken = await retrieveToken();
      } catch (error) {
        console.error(`Failed to retrieve token for ${name}:`, error);
        cachedToken = null;
      }
    }

    // Validate token and call appropriate function
    if (!cachedToken || !isTokenValid(cachedToken)) {
      return placeholder(div, size, colors, name);
    } else {
      return fn(div, data, size, file, colors, ...options);
    }
  };
}