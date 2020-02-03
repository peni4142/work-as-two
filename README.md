# work-as-two README

Often as a developer you have to work in two files at the same time. For test-driven-development, as an example you often edit the functional and test parts in different files. Or while web development you would like to open the associated css file.

So let the extension open for you the associated file side by side :-)

The replacement of the slashes works like the string function `replace` You need to define a regex which has to match your file. The backslashes have to be escaped. Then you can use groups to define the filename of the complementary. I recommend using `^` at the beginning and `$` at the end of your filenames.

My setttings for the extension:

```json
{
    "work-as-two.leftEscapedRegex": "/^(.*)(\\.ts)$/",
    "work-as-two.leftTranformToRight": "$1.test$2",
    "work-as-two.rightEscapedRegex": "/^(.*)\\.test(\\.ts)$/",
    "work-as-two.rightTranformToLeft": "$1$2"
}
```
