import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        bgColors: {
            primary: string;
            secondary: string;
        }
    }

}