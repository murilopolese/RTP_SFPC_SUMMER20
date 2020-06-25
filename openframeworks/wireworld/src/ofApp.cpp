#include "ofApp.h"



//--------------------------------------------------------------
void ofApp::setup(){
    ofLoadImage(img, "counter2.png");
    ofLoadImage(buff, "counter2.png");
    
    ofSetRectMode(OF_RECTMODE_CENTER);
//    ofSetFrameRate(12);
}

//--------------------------------------------------------------
int ofApp::countNeighborhs(int x, int y, ofColor c){
    int sum = 0;
    if (img.getColor(x-1, y-1) == c) sum += 1;
    if (img.getColor(x, y-1) == c) sum += 1;
    if (img.getColor(x+1, y-1) == c) sum += 1;
    if (img.getColor(x-1, y+1) == c) sum += 1;
    if (img.getColor(x, y+1) == c) sum += 1;
    if (img.getColor(x+1, y+1) == c) sum += 1;
    if (img.getColor(x-1, y) == c) sum += 1;
    if (img.getColor(x+1, y) == c) sum += 1;
    return sum;
}

void ofApp::update(){
    for(int x = 1; x < img.getWidth()-1; x++) {
        for(int y = 1; y < img.getHeight()-1; y++) {
            ofColor c = img.getColor(x, y);
            if (c == colors[1]) { // conductor
                int count = countNeighborhs(x, y, colors[3]);
                if (count == 1 || count == 2) {
                    // Turn into head
                    buff.setColor(x, y, colors[3]);
                } else {
                    buff.setColor(x, y, colors[1]);
                }
            } else if (c == colors[2]) { // tail
                buff.setColor(x, y, colors[1]);
            } else if (c == colors[3]) { // head
                buff.setColor(x, y, colors[2]);
            } else { // Background or unknown
                buff.setColor(x, y, colors[0]);
            }
        }
    }
    img = buff;
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofBackground(0);
    scale = ofGetWidth()/(float)img.getWidth();
    for(int x = 0; x < img.getWidth(); x++) {
        for(int y = 0; y < img.getHeight(); y++) {
            ofColor c = img.getColor(x, y);
            if (c == colors[1]) {
                ofSetColor(33);
            } else {
              ofSetColor(c);
            }
            ofDrawRectangle(x*scale, y*scale, scale, scale);
        }
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
