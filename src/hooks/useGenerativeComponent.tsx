"use client";
import type { ServerAction } from "@/types";
import { useEffect, useRef, useState } from "react";
import { type ZodTypeAny } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

interface Props {
  prompt: string;
  schema?: ZodTypeAny;
  variants?: Array<string>;
  model?: string;
  id?: string;
  endpoint?: string;
  serverAction?: ServerAction;
}

export default function useGenerativeBlock<T>({
  serverAction,
  endpoint,
  schema,
  prompt,
  variants,
  model = "claude-sonnet-4-20250514",
  id = "",
}: Props) {
  const [{ loading, data }, setState] = useState<{
    loading: boolean;
    data: {
      id: string;
      url: string;
    } | null;
  }>({ loading: true, data: null });
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }
    hasRunRef.current = true;

    const asyncOp = async () => {
      setState({ loading: true, data: null });
      const schemaString = schema
        ? JSON.stringify(zodToJsonSchema(schema, "schema"))
        : undefined;
      // Replace generate content with a fetch to the API

      if (serverAction) {
        const response = await serverAction({
          prompt,
          schema: schemaString,
          variants,
        });
        setState({ loading: false, data: response });
      } else {
        const response = await fetch(endpoint || "/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            schema: schemaString,
            variants,
          }),
        });
        const data = await response.json();
        setState({ loading: false, data });
      }
    };

    asyncOp();
  }, [serverAction, endpoint, prompt, schema, model, id, variants]);

  return {
    loading,
    data,
  };
}
