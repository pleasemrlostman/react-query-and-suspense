# 리액트 쿼리 / 서스펜스

## 학습 목적

`react`에서 제공하는 `suspense`기능과 `v5` 버전으로 변경 후 `react-query`에서 제공하는 `useSuspenseQuery` `hook`을 이용하여 조금 더 선언적인 코드를 작성하기 위한 목적을 위해 학습함.

## 기획

`fake store api` 와 `unsplash api` 를 이용해 다수의 `api` 요청을 하여 `api` 요청을 하는 컴포넌트 마다 `skleton` 및 `error handling` 을 선언적 코드로 작성함
