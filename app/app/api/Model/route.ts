import {
  getDescriptor,
  parseDescriptor,
} from '@craftercms/content';
import { firstValueFrom, map } from 'rxjs';

export async function GET(req: Request, {
  params: {
    path = "/site/website/index.xml"
  }
}: {
  params: {
    path: string
  }
}) {

  return await firstValueFrom(
    getDescriptor(path, { flatten: true }).pipe(
      map((descriptor) => parseDescriptor(descriptor, { parseFieldValueTypes: true }))
      // Can use this for debugging purposes.
      // tap(console.log)
    )
  );
}