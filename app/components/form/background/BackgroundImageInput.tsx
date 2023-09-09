import { FunctionComponent } from "preact";
import { effect, signal } from "@preact/signals";
import { thumbHashFromImage } from "src/lib";
import { Input } from "app/components/form/input/Input";
import { sessionSignal } from "app/sessionSignal";
import { width, height } from "../SizeFieldset";
import formStyle from "../index.module.css";

const previewImageSrc = sessionSignal<string>("bg_preview_img_src", undefined);
export const thumbHash = signal<number[]>(undefined);

const setImage = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files) {
    const file = inputElement.files[0];
    if (file.size) {
      URL.revokeObjectURL(previewImageSrc.value);
      previewImageSrc.value = URL.createObjectURL(file);
    }
  }
};

const image = new Image();
image.onload = () => {
  width.value = image.naturalWidth;
  height.value = image.naturalHeight;
  thumbHash.value = thumbHashFromImage(image);
};

effect(() => {
  if (previewImageSrc.value) {
    image.src = previewImageSrc.value;
  }
});

export const BackgroundImageInput: FunctionComponent = () => (
  <div className={formStyle.grid}>
    <Input label="Image">
      <input type="file" accept="image/*" onChange={setImage} />
    </Input>
  </div>
);
