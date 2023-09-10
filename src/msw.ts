import {
  ResponseResolver,
  RestRequest,
  RestContext,
  DefaultBodyType,
} from "msw";
import { searchParamsToSvgString } from "./lib.js";

export const phimgResolver: ResponseResolver<
  RestRequest,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.set("Content-Type", "image/svg+xml"),
    ctx.body(searchParamsToSvgString(req.url.searchParams))
  );
