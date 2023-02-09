# tistory comment notify
> only square skin

티스토리 square skin 댓글 알림

# Features
> 월 ~ 금 09~18시 의 59분에 실행된다.

티스토리 squre skin 기준으로 한시간마다 좌측의 최근 댓글 수집 후 Slack 채널로 알림 발송

# How to use
## Develop
> root 경로에 .env파일 생성 후 아래 환경변수 세팅

WEBHOOK_URI=slack webhook uri 입력

CHANNEL=채널 입력

USER_NAME=채널에서 표시될 이름 입력

URL=tistory url 입력

NODE_ENV=dev


## Production
> Github actions repository secrets 설정

WEBHOOK_URI=slack webhook uri 입력

CHANNEL=채널 입력

USER_NAME=채널에서 표시될 이름 입력

URL=tistory url 입력


## Crontab 설정
현재 Gitbucb actions crontab 부분에 월 ~ 금 09~18시 59분으로 설정되어있다.

원하는 시간있다면 Github actions 의 cron부분을 수정하면 된다.

